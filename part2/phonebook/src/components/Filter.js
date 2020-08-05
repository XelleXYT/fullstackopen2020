import React from 'react'

const Filter = (props) => {
    const {newFilter, handleFilterChange} = props

    return (
        <div>filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>
    )
}

export default Filter