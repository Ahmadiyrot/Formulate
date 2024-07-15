import React from 'react';

const DataColumn = ({ data }) => {
    return (
        <div className="col d-flex justify-content-center align-items-center">
            <p>{data}</p>
        </div>
    );
};

export default DataColumn;
