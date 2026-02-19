import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

import { getOverview } from "../../../services/apiServices";
// import { RechartsDevtools } from "@recharts/devtools";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

const Dashboard = (props) => {
  const [dataOverview, setDataOverview] = useState({});
  const [dataChart, setDataChart] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    let res = await getOverview();
    console.log(">>> check res overview: ", res);
    if (res && res.EC === 0) {
      setDataOverview(res.DT);

      //process data for chart
      let Qz = 0,
        Qs = 0,
        As = 0;
      if (res.DT && res.DT.others) {
        Qz = res.DT.others.countQuiz || 0;
        Qs = res.DT.others.countQuestions || 0;
        As = res.DT.others.countAnswers || 0;
      }
      setDataChart([
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ]);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">{t("adminPage.content.dashboardTitle")}</div>
      <div className="sub-title">Hello Trí đẹp trai</div>
      <hr />
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">{t("adminPage.content.totalUsers")}</span>
            <span className="text-2">
              {dataOverview && dataOverview.users && dataOverview.users.total
                ? dataOverview.users.total
                : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">
              {t("adminPage.content.totalQuizzes")}
            </span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz
                ? dataOverview.others.countQuiz
                : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">
              {t("adminPage.content.totalQuestions")}
            </span>
            <span className="text-2">
              {" "}
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions
                ? dataOverview.others.countQuestions
                : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">
              {t("adminPage.content.totalAnswers")}
            </span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers
                ? dataOverview.others.countAnswers
                : 0}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
