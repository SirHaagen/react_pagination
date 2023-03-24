import { Pagination } from '@mui/material';

const PaginationUsers = ({ setPage }) => {

  const handleChange = (e, pag) => {
    document.querySelector(".container_users").scroll(0,0);
    //console.log(e,pag);
    setPage(pag)
  }

  return (<>
    <Pagination count={20} color="primary" showFirstButton showLastButton size='small' onChange={handleChange} className="pagination_users"/>
  </>)

}

export default PaginationUsers;