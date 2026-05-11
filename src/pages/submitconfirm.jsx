import React, { useEffect } from 'react';

function SubmitConfirm() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/";
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="page fade-in" style={{ display: 'block' }}>
            <div className="page-header">
                <h2>Message Received!</h2>
                <p>Thanks for reaching out to SWERVO 26256.</p>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '20px auto', padding: '40px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>
                <h3 style={{ color: 'white', marginBottom: '16px' }}>Submission Successful</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '30px' }}>
                    We've received your inquiry. You will be redirected home in 5 seconds, or you can click the button below.
                </p>

                <a href="/" className="btn btn-primary" style={{ display: 'inline-block', width: '100%', padding: '12px', borderRadius: '6px', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold' }}>
                    Return Home Now
                </a>
            </div>
        </section>
    );
}

export default SubmitConfirm;