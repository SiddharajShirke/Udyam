"""Login anomaly detection with an optional plain-language Claude summary."""

from collections import Counter
from datetime import datetime, timezone
from agents.claude_helper import ask_claude


def detect_login_anomaly(events: list[dict]) -> dict:
    today = datetime.now(timezone.utc).date()
    counts: Counter = Counter()
    for event in events:
        created_at = event.get("created_at")
        if isinstance(created_at, str):
            created_at = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
        if created_at is None:
            continue
        if created_at.tzinfo is None:
            created_at = created_at.replace(tzinfo=timezone.utc)
        counts[created_at.astimezone(timezone.utc).date()] += 1
    current_volume = counts[today]
    baseline_days = [today.fromordinal(today.toordinal() - offset) for offset in range(1, 6)]
    baseline = sum(counts[day] for day in baseline_days) / len(baseline_days)
    anomaly_detected = current_volume >= 3 and (baseline == 0 or current_volume >= baseline * 3)
    if anomaly_detected:
        generated = ask_claude(f"Today's login events: {current_volume}. Five-day daily average: {baseline:.1f}. Explain this potential login spike to an administrator in one sentence.", "You are a concise security operations assistant. Do not invent facts.")
        return {"anomaly_detected": True, "summary": generated or f"Login activity is elevated: {current_volume} events today versus a {baseline:.1f} daily baseline.", "recommended_action": "Review the affected login audit events and verify that the activity is expected."}
    return {"anomaly_detected": False, "summary": f"Login activity is within the recent baseline ({current_volume} events today; {baseline:.1f} average).", "recommended_action": "Continue normal monitoring."}
