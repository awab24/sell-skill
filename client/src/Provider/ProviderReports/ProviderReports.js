import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ProviderReports() {
    const [reports, setReports] = useState([])
    useEffect(() => {
        const fetchReports = async() => {
          const response = await axios.get('http://localhost:5000/api/endpoints/getReport')
          setReports(response.data)
          console.log('reports ===> '+response.data)
        }
        fetchReports();
      },[])
      

  return (
    <div>
                      {
                  reports.length > 0 ? reports.map((report) => <div>{report?.report.report}</div>):<div>Loading...</div>
                }
    </div>
  )
}

export default ProviderReports
