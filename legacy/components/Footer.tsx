import { memo } from "react";
import { Link } from "react-router-dom";
function Footer() {
	return (
		<footer className='w-full flex flex-col justify-center  items-center gap-6'>
			<h6>
				Este site não utiliza
				<Link className='' to='/b-log'>
					{" "}
					🍪
				</Link>
				:)
			</h6>
		</footer>
	);
}

export default memo(Footer);
