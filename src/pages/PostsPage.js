import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPosts, postsSelector } from '../slices/posts'

// import { Post } from '../components/Post'
import DataTable from "react-data-table-component";

// const columns = [
//   { Header: 'Name', accessor: 'name', },
//   { Header: 'Status', accessor: 'status', },
//   { Header: 'Type', accessor: 'type', },
//   // { id: 'type', title: 'Type', dataIndex: 'type', key: 'type', width: 100 },
//   // {
//   //   title: '',
//   //   dataIndex: 'id',
//   //   key: 'id',
//   //   render: (text, record) => (
//   //     <a onClick={e => this.onDelete(record.key, e)} href="#">
//   //       Save
//   //     </a>
//   //   ),
//   // },
// ];




const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasErrors } = useSelector(postsSelector);



  useEffect(() => {
    setTotalRows(posts?.info?.count);
  }, [posts?.info?.count]);

  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPosts(currentPage))
  }, [dispatch, currentPage]);

  const handlePerRowsChange = async (newPerPage, page) => {
    // fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handlePageChange = page => {

    // fetchPosts(page);
    console.log("HOLA", page);
    setCurrentPage(page);
  };

  const columns = useMemo(
    () => [
      {
        name: "First Name",
        accessor: "name",
        sortable: true
      },
      {
        name: "Status",
        selector: "status",
        sortable: true
      },
      {
        name: "Type",
        selector: "type",
        sortable: true
      },
      // {
      //   // eslint-disable-next-line react/button-has-type
      //   cell: row => <button onClick={handleDelete(row)}>Delete</button>
      // }
    ],
    // [handleDelete]
  );

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display posts.</p>
    if (posts?.results?.length > 0) {
      // return posts?.results?.map(post => <Post key={post.id} post={post} excerpt />)


      return (
        <DataTable
          title="Users"
          columns={columns}
          data={posts?.results}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          selectableRows={false}
          paginationComponentOptions={{ noRowsPerPage: true }}
          onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        />);

      // return <Table
      //   columns={columns}
      //   data={posts?.results}
      //   setPage={setPage}
      //   setPerPage={setPerPage}
      //   currentpage={page}
      //   perPage={10}
      //   totalPage={schools?.data.totalPages}
      // />
      // }
    }
  }

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  )
}


export default PostsPage
