import { Grid } from 'gridjs-react';
import React from 'react'
import "gridjs/dist/theme/mermaid.css";

export const Table = ({ data, columns, limit, dataMapper }) => {

    const mappedData = data.map(dataMapper)

    return (
        <div>
            <Grid 
                data={mappedData}
                columns={columns}
                search = {true}
                pagination={{
                    limit: limit,
                }}
                className ={{
                    table : 'w-full'
                }}
            />
            
        </div>
    );
}
