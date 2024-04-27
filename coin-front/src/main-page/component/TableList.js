import React from 'react';
import TableRow from "./TableRow";

function TableList({ list }) {
    return (
        <div>
            {list.map(item => <TableRow key={item.id} {...item} />)}
        </div>
    );
}


export default TableList;
