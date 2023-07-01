import "./PageError.scss";

import PropTypes from "prop-types";

PageError.propTypes = {
  value: PropTypes.string,
};
export function PageError(props) {
    return (
        <div class="page-container">
		<div class="page-container__content">
			<h2>.It was popularised in the 1960s</h2>
			<i>{props?.value}</i>
		</div>
	</div>
    )
}