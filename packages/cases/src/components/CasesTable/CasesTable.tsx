import { Case } from 'shared/dist/api/cases';

interface CasesTableProps {
  cases: Case[];
}

const CasesTable = ({ cases }: CasesTableProps) => {
  return <div>I'm your cases table!</div>;
};

export default CasesTable;
