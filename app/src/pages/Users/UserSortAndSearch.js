import React from 'react';

const UserSortAndSearch = ({setSearchQuery,setSorter}) => {

    const onSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const onSort = (e) => {
        setSorter(+e.target.value)
    }

    return (
        <div>
            <div className="input-group mt-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search name ..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={onSearch}
                />
            </div>
            <select className="form-select mt-3"
                    aria-label="Default select example"
                    onChange={onSort}
            >
                <option defaultValue value="0"> Sort id </option>
                <option value="1">from Min to Max</option>
                <option value="2">from Max to Min</option>
            </select>
            
        </div>
    );
};

export default UserSortAndSearch;