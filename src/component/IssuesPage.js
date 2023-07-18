import React, { useState, useEffect } from 'react';
import "./IssuesPage.css"

// fetch issues 
const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 3;

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      // using fetch api we are fetching issues
      const response = await fetch('https://api.github.com/repos/octocat/hello-world/issues');
      const data = await response.json();
      setIssues(data);
      console.log(data);
    } catch (error) {
      console.error('Error in fetching issues:', error);
    }
  };

  // page change handle
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // isssues list
  const renderIssues = () => {
    const lastIndex = currentPage * issuesPerPage;
    const firstIndex = lastIndex - issuesPerPage;
    const currentIssues = issues.slice(firstIndex, lastIndex);

    // issues data
    return currentIssues.map((issue) => (
      <div  key={issue.id} className="issue" >
        <p><h3><span> User Name : </span>{issue.user.login}</h3>   <span>Issue Number: {issue.number}</span></p>
        <h4> Issue Title : {issue.title}</h4>
      </div>
    ));
  };

  // pagination code
  const renderPagination = () => {
    const pageNumbers = Math.ceil(issues.length / issuesPerPage);

    return (
      <div className='pagination-container'>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              id="pagination"
            >
              {pageNumber} 
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 style={{textAlign : 'center', color : "blue"}}>Welcome To GitHub Issues List</h2>
      {renderIssues()}
      {renderPagination()}
    </div>
  );
};

export default IssuesPage;


