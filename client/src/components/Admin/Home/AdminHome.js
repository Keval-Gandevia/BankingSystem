import React from "react";
import "./AdminHome.css";
import { useState, useEffect } from 'react'

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();
    setData(data);
    console.log(data)
    setLoading(false);
  }, []);

  return { data, loading };
};


export default function AdminHome() {
  const spinnerJSX = <>

    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </>
  const { data, loading } = useFetch("/admin/getAdminDetails")
  return (
    <div style={{ display: "flex", "justify-content": "space-evenly", "padding-top": "20px" }}>
      <div class="card bg-gradient-danger card-img-holder text-white">
        <div class="card-body">
          <img
            src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
            class="card-img-absolute"
            alt="circle-image"
          />

          <h2 class="mb-5">Welcome</h2>
          <h4 class="card-text" style={{ "text-transform": "capitalize" }}>{loading ? spinnerJSX : data["Name"]}</h4>
        </div>
      </div>
      <div class="card bg-gradient-info card-img-holder text-white">
        <div class="card-body">
          <img
            src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
            class="card-img-absolute"
            alt="circle-image"
          />

          <h2 class="mb-5">Total cash remaining</h2>
          <h4 class="card-text">${loading ? spinnerJSX : data["Amount"]}</h4>
        </div>
      </div>
      <div class="card bg-gradient-success card-img-holder text-white">
        <div class="card-body">
          <img
            src="https://www.bootstrapdash.com/demo/purple-admin-free/assets/images/dashboard/circle.svg"
            class="card-img-absolute"
            alt="circle-image"
          />

          <h2 class="mb-5">Total loans granted</h2>
          <h4 class="card-text">{loading ? spinnerJSX : data["Loans"]}</h4>
        </div>
      </div>
    </div>
  );
}
