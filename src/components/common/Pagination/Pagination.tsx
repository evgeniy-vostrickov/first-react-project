import React, {useState} from 'react'
import styles from './Pagination.module.css'
import cn from 'classnames'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (page: number) => void
}

const Pagination: React.FC<PropsType> = (props) => {
    const [portionNumber, setPortionNumber] = useState(1);
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++)
        pages.push(i);

    let portionCount = Math.ceil(pagesCount/props.portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;
    
    return (
        <div>
            {
                portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}} >PREV</button>
            }
            {
                pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(page => {
                    return <span className={cn({[styles.selectedPage]: props.currentPage === page}, styles.pageSize)} onClick={(event) => { props.onPageChanged(page) }}>{page}</span>
                })
            }
            {
                portionNumber !== portionCount && <button onClick={() => {setPortionNumber(portionNumber + 1)}} >NEXT</button>
            }
        </div>
    );
}

export default Pagination;