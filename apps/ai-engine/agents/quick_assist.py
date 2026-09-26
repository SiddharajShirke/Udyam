"""Stateless role-aware help for portal integrations."""
from agents.claude_helper import ask_claude

ROLE_GUIDANCE = {"ministry": "Use public-sector procurement language and focus on outcomes and compliance.", "startup": "Use simple practical language for a startup founder and suggest a next step.", "evaluator": "Use precise technical language focused on evidence, metrics, and fair assessment.", "admin": "Use operational language focused on governance, auditability, and actions."}


def answer_quick_assist(question: str, role_context: str) -> str:
    response = ask_claude(question, f"You are InnovateProcure's assistant. {ROLE_GUIDANCE[role_context]} Keep the response concise and factual.")
    return response or f"For a {role_context}, focus on this next: {question.strip()} Review the relevant platform record and document the supporting evidence."
