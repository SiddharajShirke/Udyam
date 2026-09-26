import { Textarea } from "../ui/Textarea";

interface ScoreCriterionProps {
  label: string;
  weight: number;
  score: number;
  note: string;
  onScoreChange: (score: number) => void;
  onNoteChange: (note: string) => void;
}

export function ScoreCriterion({ label, weight, score, note, onScoreChange, onNoteChange }: ScoreCriterionProps) {
  return (
    <div className="border border-gov-border-light bg-white p-5 shadow-gov-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#162b47]">{label}</h3>
          <p className="mt-1 text-sm text-gov-text-secondary">Weighted contribution: {weight}% · Score scale: 1–5</p>
        </div>
        <label className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-gov-text-secondary">
          Score
          <select
            value={score}
            onChange={(event) => onScoreChange(Number(event.target.value))}
            className="rounded-gov border border-gray-300 bg-white px-3 py-2 text-base font-bold text-[#162b47] focus:border-gov-blue-accent focus:outline-none focus:ring-2 focus:ring-gov-blue-accent/30"
            aria-label={`${label} score`}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} / 5
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_130px]">
        <Textarea label="Evaluator notes" placeholder="Add evidence for this score" value={note} onChange={(event) => onNoteChange(event.target.value)} className="min-h-[80px]" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gov-text-muted">Weighted score</p>
          <p className="mt-1 font-display text-4xl font-bold text-brand-orange">{((score / 5) * weight).toFixed(1)}</p>
          <div className="mt-2 h-2 bg-gov-surface">
            <div className="h-full bg-brand-orange transition-all" style={{ width: `${(score / 5) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
