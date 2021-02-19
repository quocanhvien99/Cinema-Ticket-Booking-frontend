import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import './style.css';

export default function Contact() {
	return (
		<div>
			<NavBar />
			<div className="Contact">
				<div className="container">
					<h2>Liên hệ với chúng tôi</h2>
					<div className="map_container">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25615.906364793133!2d106.70663701731654!3d10.78025381605616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf16ffaa20e46e87f!2sCJ+CGV+Vietnam!5e0!3m2!1sen!2s!4v1459915713967"
							width="600"
							height="450"
							frameBorder="0"
							allowFullScreen=""
							title="map"></iframe>
					</div>
					<div className="contact">
						<h3>TRỤ SỞ CHÍNH</h3>
						<div>
							Tầng 2, Rivera Park Saigon - Số 7/28 Thành Thái, P.14, Q.10, Thành
							phố Hồ Chí Minh.
						</div>
					</div>
					<div className="contact">
						<h3>DỊCH VỤ KHÁCH HÀNG</h3>
						<div>
							<p>Hotline: 1900 6017</p>
							<p>Giờ làm việc: 8:00 - 22:00</p>
							<p>Tất cả các ngày bao gồm cả Lễ Tết</p>
							<p>Email hỗ trợ: hoidap@cgv.vn</p>
						</div>
					</div>
					<div className="contact">
						<h3>
							LIÊN HỆ QUẢNG CÁO , TỔ CHỨC SỰ KIỆN & MUA VÉ NHÓM DÀNH CHO CÁC
							DOANH NGHIỆP
						</h3>
						<div>
							<p>Phòng kinh doanh: +84-28-3636 57 57</p>
							<p>Ext: 278 (Ms. Thúy An)</p>
							<p>Hotline: 0981005390</p>
							<p>Email: ad.cgv@cj.net</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
