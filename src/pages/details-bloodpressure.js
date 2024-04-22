import { Helmet } from "react-helmet-async";
import "./details-bloodpressure.css";
import React, { useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";

//date show
const generateDays = (startDate, numberOfDays) => {
  const endDate = new Date(startDate.getTime());
  endDate.setDate(startDate.getDate() + numberOfDays - 1);
  return eachDayOfInterval({ start: startDate, end: endDate }).map((day) => ({
    day: format(day, "EEE"),
    date: format(day, "d"),
    fullDate: format(day, "yyyy-MM-dd"),
    color: "var(--Red)",
    textColor: "var(--whiteColor)",
  }));
};

const DetailsBloodpressure = () => {
  //days
  const startDate = new Date(2024, 5, 1);
  const days = generateDays(startDate, 100);

  //on click day
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (fullDate) => {
    setSelectedDay(fullDate);
  };

  //diagram
  // Chart options
  const chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: "Blood Pressure",
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgba(190, 2, 2, 0.3)",
            borderDash: [5, 5],
            lineWidth: 2.77,
          },
          scaleLabel: {
            display: true,
            labelString: "Day",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(190, 2, 2, 0.3)",
            borderDash: [5, 5],
            lineWidth: 2.77,
          },
          scaleLabel: {
            display: true,
            labelString: "mmHg",
          },
        },
      ],
    },
  };

  // Upper bound data
  const datau = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Upper Bound",
        data: [100, 116, 100, 140, 120, 138, 100],
        borderColor: "#be0202",
        backgroundColor: "#be0202",
      },
    ],
    options: {
      legend: {
        position: "left",
      },
    },
  };

  // Lower bound data
  const datal = {
    labels: ["", "", "", "", "", "", ""],
    display: false,
    datasets: [
      {
        label: "Lower Bound",
        data: [90, 100, 89, 90, 69, 50, 91],
        borderColor: "#be0202",
        backgroundColor: "#be0202",
      },
    ],
    options: {
      legend: {
        position: "left",
      },
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>Details Blood Pressure♥ </title>{" "}
        <meta name="description" content="Details Blood Pressure" />
      </Helmet>{" "}
      <div className="detailsbp">
        <div className="headcon">
          <div className="dBP-address">
            <p>Bloode Pressure</p>
          </div>
          <div className="dBP-status">
            <p>
              Average <span>140/90</span> mmHG
            </p>
            <button>
              <p>Normal</p>
            </button>
          </div>
        </div>
        <div className="contant">
          <div className="dBP-date">
            {days.map((item, index) => (
              <div key={index} className="day-container">
                <div className="day-name">{item.day}</div>
                <div
                  className={`date-container ${
                    selectedDay === item.fullDate ? "selected" : ""
                  }`}
                  onClick={() => handleDayClick(item.fullDate)}
                  style={{ background: item.color }}
                >
                  <div className="date-text" style={{ color: item.textColor }}>
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="dBP-diagram">
            <div className="diagramupper">
              <Line data={datau} options={chartOptions} />
            </div>
            <div className="diagramlower">
              <Line data={datal} options={chartOptions} />
            </div>
          </div>

          <div className="inf-det">
            <h3>Recommended Reading</h3>
            <h4>How To Loss Sugar ?</h4>
            <p>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero's De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with:
              <br />
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.”
            </p>
          </div>
          <div className="btn">
            <NavLink to="/blood_pressure" className="addrec">
              Add New Record
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailsBloodpressure;
