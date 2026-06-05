interface DiffTagProps {
  tag: string;
}

const tagStyles: Record<string, string> = {
  'NEW FIELD': 'bg-red-50 text-red-700 border-red-200',
  'EXPANDED USE': 'bg-orange-50 text-orange-700 border-orange-200',
  'POLICY CHANGE': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'STALE DOC': 'bg-gray-100 text-gray-600 border-gray-200',
  'MISSING DISCLOSURE': 'bg-red-50 text-red-700 border-red-200',
  'PROMPT CHANGE': 'bg-purple-50 text-purple-700 border-purple-200',
  'DESIGN CHANGE': 'bg-blue-50 text-blue-700 border-blue-200',
};

export function DiffTag({ tag }: DiffTagProps) {
  const style = tagStyles[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide border ${style}`}>
      {tag}
    </span>
  );
}
