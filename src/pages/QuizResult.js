import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const questions = location?.state?.data;
  const chosse = location?.state?.chosse;

  const getColorOfAnswer = (answer, question) => {
    const correctAnswer = questions?.find(
      (i) => i?.question === question?.question
    )?.correct_answer;

    const choosedAnswer = chosse?.find(
      (i) => i?.question === question?.question
    )?.answer;

    let style = "";
    switch (answer) {
      case correctAnswer:
        style = "btn btn-success";
        break;
      case choosedAnswer:
        style = "btn btn-danger";
        break;
      default:
        style = "btn btn-outline-success";
        break;
    }
    return style;
  };

  const questionCount = useMemo(() => questions?.length, []);

  const rightAnswerCount = useMemo(() => {
    let cnt = 0;
    for (const chossedAnswer of chosse) {
      if (
        questions?.find((item) => item?.question === chossedAnswer?.question)
          ?.correct_answer === chossedAnswer?.answer
      ) {
        cnt++;
      }
    }

    return cnt;
  }, []);

  const colorOfScore = useMemo(() => {
    let color = "";
    switch (rightAnswerCount) {
      case 0:
      case 1:
        color = "bg-danger";
        break;
      case 2:
      case 3:
        color = "bg-warning";
        break;
      case 4:
      case 5:
        color = "bg-success";
        break;
      default:
        break;
    }
    return color;
  }, []);

  return (
    <>
      <p className="h1 text-center">RESULTS</p>

      {questions?.map((item, row) => (
        <div className="row justify-content-md-center" key={row}>
          <div className="row justify-content-md-center">
            <div className="col col-lg-10">
              <p dangerouslySetInnerHTML={{ __html: item?.question }}></p>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className=" col col-lg-10">
              <div className="d-flex flex-row">
                {item?.answers.map((answer, index) => (
                  <div className="p-2" key={index}>
                    <button
                      type="button"
                      className={getColorOfAnswer(answer, item)}
                    >
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="row justify-content-md-center m-2">
        <div className="col col-lg-10">
          <p className={`text-center ${colorOfScore}`}>
            You scored {rightAnswerCount} out of {questionCount}
          </p>
        </div>
      </div>

      <div className="row justify-content-md-center m-2">
        <div className=" col col-lg-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Create a new quiz
          </button>
        </div>
      </div>
    </>
  );
}
