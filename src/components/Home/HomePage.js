import { useSelector } from "react-redux";
import videoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const isAutheticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      {/* Theo trải nghiệm người dùng nên muốn video tự chạy
       khi load web thì cần thêm autoPlay + muted */}
      <video width="500" height="500" autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="main-title">{t("homePage.mainTitle")}</div>
        <div className="content-title">{t("homePage.contentTitle")}</div>
        <div>
          {isAutheticated ? (
            <button
              className="getStarted-button"
              onClick={() => navigate("/users")}
            >
              {t("homePage.getStartedButton")}
            </button>
          ) : (
            <button
              className="getStarted-button"
              onClick={() => navigate("/login")}
            >
              {t("homePage.getStartedButton")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
