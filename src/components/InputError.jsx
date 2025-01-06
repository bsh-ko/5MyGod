import PropTypes from "prop-types";

InputError.propTypes = {
  target: PropTypes.object,
};

export default function InputError({ target }) {
  if (!target) return;

  return <p>{target.message}</p>;
}
