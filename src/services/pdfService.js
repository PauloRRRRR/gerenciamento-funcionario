import pdfService from '../services/pdfService';

const EmployeeComponent = ({ employee }) => {
  const handleDownloadPDF = () => {
    pdfService.generateEmployeePDF(employee);
  };

  return (
    <button onClick={handleDownloadPDF}>Baixar PDF</button>
  );
};

export default EmployeeComponent;
