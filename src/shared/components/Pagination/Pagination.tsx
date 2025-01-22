import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Container } from 'react-bootstrap';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  const nextPage = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const previousPage = () => {
    setPage((prevPage: number) => prevPage - 1);
  };

  if (!totalPages) return null;

  return (
    <Container className="d-flex justify-content-center align-items-center my-3">
      {page > 1 && (
        <Button
          className="me-3"
          variant="primary"
          size="sm"
          onClick={previousPage}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Prev
        </Button>
      )}
      <span className="fs-5">{page}</span>
      {page < totalPages && (
        <Button
          className="ms-3"
          variant="primary"
          size="sm"
          onClick={nextPage}
        >
          Next
          <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </Button>
      )}
    </Container>
  );
};

export default Pagination;
