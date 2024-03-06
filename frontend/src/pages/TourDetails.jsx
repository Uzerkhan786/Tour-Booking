import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import "../styles/tour-details.css";
// import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL, URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loader/Loading";

const TourDetails = () => {
  const { id } = useParams();
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState({
    reviewText: "",
  });

  // fetch data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    address,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }
      //console.log(id);

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          username: user.username,
          reviewText: review.reviewText,
          rating: tourRating,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      toast.success(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const reviewInput = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div>
        <Toaster />
      </div>
      <Container>
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {loading ? (
          <Loading />
        ) : (
          !loading &&
          !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={`${URL}/images/${photo}`} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          class="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}
                        {avgRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i class="ri-map-pin-fill"></i> {address}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i class="ri-money-dollar-circle-line"></i> {price}/ per
                        person
                      </span>
                      <span>
                        <i class="ri-map-pin-time-line"></i> {distance} k/m
                      </span>
                      <span>
                        <i class="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* ============ TOUR REVIEWS SECTION START ============ */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span
                          name="rating"
                          onClick={() => setTourRating(1)}
                          onChange={reviewInput}
                        >
                          1 <i class="ri-star-s-fill"></i>
                        </span>
                        <span
                          name="rating"
                          onClick={() => setTourRating(2)}
                          onChange={reviewInput}
                        >
                          2 <i class="ri-star-s-fill"></i>
                        </span>
                        <span
                          name="rating"
                          onClick={() => setTourRating(3)}
                          onChange={reviewInput}
                        >
                          3 <i class="ri-star-s-fill"></i>
                        </span>
                        <span
                          name="rating"
                          onClick={() => setTourRating(4)}
                          onChange={reviewInput}
                        >
                          4 <i class="ri-star-s-fill"></i>
                        </span>
                        <span
                          name="rating"
                          onClick={() => setTourRating(5)}
                          onChange={reviewInput}
                        >
                          5 <i class="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          name="reviewText"
                          placeholder="share your thoughts"
                          onChange={reviewInput}
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>

                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i class="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* ============ TOUR REVIEWS SECTION END ============== */}
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )
        )}
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
