interface AdventureLogProps {
  entries: string[];
}

export function AdventureLog({ entries }: AdventureLogProps) {
  if (entries.length === 0) return null;

  return (
    <div className="adventure-log">
      <h3>Battle Report</h3>
      <div className="log-entries">
        {entries.map((entry, i) => (
          <div key={i} className={`log-entry ${getEntryClass(entry)}`}>
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

function getEntryClass(entry: string): string {
  if (entry.includes('slain') || entry.includes('died')) return 'log-kill';
  if (entry.includes('survived') || entry.includes('wound')) return 'log-wound';
  if (entry.includes('soul')) return 'log-soul';
  if (entry.includes('damage')) return 'log-damage';
  if (entry.includes('lured')) return 'log-lure';
  return '';
}
