import { Box } from '@chakra-ui/react';
import StylePagination from './Pagination.module.css';

export default function Pagination(props:any) {
  const getPages = () => {
    const result = [];
    for (let i = 0; i < props.total; i++) {
      let page = i + 1;
      if(i === 0 && props.page > 3){
        result.push(
          <button key={i}
            onClick={() => {props.onChange(page)}}
          >
            &laquo;
          </button>
        );
      }else if(i >= (props.page - 3) && i <= (props.page + 1)){
        result.push(
          <button key={i}
            className={props.page === page ? StylePagination.active : ""}
            onClick={() => {props.onChange(page)}}
          >
            { page }
          </button>
        );
      }
      if (i === (props.total - 1) && props.page < (props.total - 2)){
          result.push(
            <button key={i}
              onClick={() => {props.onChange(page)}}
            >
              &raquo; 
            </button>
          );
      }
    }
    return result; 
  };

  return (
    <Box className={StylePagination.pagination}  color="Gray" borderColor="Gray" style={{ marginTop: "25px", width: "100%" }}>
      <br/>
      { getPages() }
    </Box>
  );
}
