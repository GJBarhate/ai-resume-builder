import PropTypes from "prop-types";

function SummaryPreview({ resumeInfo }) {
  return (
    <p className="text-xs">
      {resumeInfo?.summary}
    </p>
  );
}

SummaryPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    summary: PropTypes.string,
  }),
};

export default SummaryPreview;
