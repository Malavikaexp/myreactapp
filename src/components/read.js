import React, {useEffect,useState} from "react";
import {Button, Table} from 'semantic-ui-react';
import axios from 'axios';


export default function Read(){
    const [APIData, setAPIData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('name'); // Default sorting criteria
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        axios.get(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials`)
        .then((response) => {
            setAPIData(response.data);
        })
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredItems = APIData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
    

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setEditMode(false);
      };
      const totalItems = filteredItems.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
          }
      };

      const handleItemsPerPageChange = (event) => {
      const newItemsPerPage = parseInt(event.target.value);
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); 
      };

      const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1); 
      };

      const toggleEditMode = () => {
        setEditMode(!editMode);
      };
    
       
    //   const setUpdateData = (data) => {
    //     console.log(data);
    //  }

    const updateAPIData = (updatedItem) => {
        axios.put(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials/${updatedItem.id}`, updatedItem)
        .then((response) => {
            if (response.status === 200) {
              console.log('Item was updated successfully');
            } else {
              console.log('Error updating item:', response.data);
            }
            getData();
          })
          .catch((error) => {
            console.error('Error updating item:', error);
          });
          
      };
    
    

     const handleSave = () => {
        
        updateAPIData(selectedItem);
        setEditMode(false);
      };

    

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        const {Qualification, Qualificationvalue} = e.target
        setSelectedItem({
          ...selectedItem,
          [name]: value,
          [Qualification]: Qualificationvalue,
        });
      };
    
      const handleSort = (criteria) => {
        if (criteria === sortCriteria) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortOrder('asc');
        }
        setSortCriteria(criteria);
      };

      const getData = () => {
        axios.get(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials`)
            .then((getData) => {
                 setAPIData(getData.data);
             })
    }

      const onDelete = (id) => {
        axios.delete(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials/${id}`)
     .then(() => {
        getData();
    })
}

      const sortedItems = filteredItems.slice().sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortCriteria].localeCompare(b[sortCriteria]);
        } else {
          return b[sortCriteria].localeCompare(a[sortCriteria]);
        }
      });

      const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
        <h2>Registered Candidates</h2>
        <label>
        Items per page:
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
          <option value={35}>35</option>
          <option value={40}>40</option>
          <option value={45}>45</option>
          <option value={50}>50</option>
          
        </select>
      </label>

      <div>
      <label>
        Search:
        <input type="text" value={searchQuery} onChange={handleSearchChange} />
      </label>
      </div>

        <table>
        <thead>
          <tr>
    {/* <th
      onClick={() => handleSort('id')}
      className={sortCriteria === 'id' ? 'sorted' : ''}
    >
      ID {sortCriteria === 'id' && sortOrder === 'asc' && '↑'}
      {sortCriteria === 'id' && sortOrder === 'desc' && '↓'}
    </th> */}
    <th
      onClick={() => handleSort('name')}
      className={sortCriteria === 'name' ? 'sorted' : ''}
    >
      Name {sortCriteria === 'name' && sortOrder === 'asc' && '↑'}
      {sortCriteria === 'name' && sortOrder === 'desc' && '↓'}
    </th>
  </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} >
              <td onClick={() => handleItemClick(item)}>{item.name}</td>
              <td><Button onClick={() => onDelete(item.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      {selectedItem && (
        <div style={{ marginTop: 20}}>
          <h2>Selected Candidate Details</h2>
          {editMode ? (
            <div>
              <input
                type="text"
                name="name"
                value={selectedItem.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Qualification"
                value={selectedItem.Qualification}
                onChange={handleInputChange}
              />
              <button type = 'submit' onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
          <p>Name: {selectedItem.name}</p>
          <p>Qualification: {selectedItem.Qualification}</p>
          <p>
          <button onClick={toggleEditMode}>Update</button>
          </p>
        </div>
      )}
       </div>
    )}


     </div>
  
    );

}