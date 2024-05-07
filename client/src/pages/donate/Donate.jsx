import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './Donate.css';
import { useMutation } from '@apollo/client';
import { DONATE_AMOUNT } from '../../utils/mutations';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const Donate = () => {
  const [donateAmount, { error }] = useMutation(DONATE_AMOUNT);

  const handleDonate = async (amount) => {
    if (amount) {
      try {
        const stripe = await loadStripe(STRIPE_KEY);
        const { data } = await donateAmount({
          variables: {
            amount: '' + amount,
          },
        });
        console.log('response donate', data);
        await stripe.redirectToCheckout({
          sessionId: data?.donateAmount?.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="donate">
      <h2 className="title">Donate Amount</h2>
      {error && (
        <p className="error-msg">Error during donation. try again later</p>
      )}
      <div className="cards">
        <Card className="card">
          <Card.Body>
            <Card.Title>Donation Amount</Card.Title>
            <Card.Text className="mt-2">Donate $5</Card.Text>
            <Button variant="primary" onClick={() => handleDonate(5)}>
              Donate
            </Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Body>
            <Card.Title>Donation Amount</Card.Title>
            <Card.Text className="mt-2">Donate $10</Card.Text>
            <Button variant="primary" onClick={() => handleDonate(10)}>
              Donate
            </Button>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Body>
            <Card.Title>Donation Amount</Card.Title>
            <Card.Text className="mt-2">Donate $15</Card.Text>
            <Button variant="primary" onClick={() => handleDonate(15)}>
              Donate
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Donate;
