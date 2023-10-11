import React from "react";
import { MDBCol,MDBContainer,MDBRow} from "mdb-react-ui-kit";
import { FaHeartBroken, FaSadTear } from "react-icons/fa";

export const NotFound = () => {
	return (
		<section className="notfound">
					<h1>404 Not Found</h1>
					<p><FaHeartBroken className="broken-heart" />
					<FaSadTear className="sad-tear" /></p>
		</section>
	);
};

