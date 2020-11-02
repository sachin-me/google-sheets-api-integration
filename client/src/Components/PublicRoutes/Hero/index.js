import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

class Hero extends Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <div className="mt-5">
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            </Col>
            {/* <Col>
              <Image src={banner} />
            </Col> */}
          </Row>
        </Container>
        {/* <div>
          <Footer />
        </div> */}
      </>
    );
  }
}

export default Hero;
