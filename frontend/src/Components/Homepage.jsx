import React from 'react';


const Homepage = () => {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome to Zylo!</h1>
            </header>
            <main className="homepage-main">
                <section>
                    <p>
                        Zylo is a platform designed to connect people, ideas, and opportunities. 
                        Join our community to explore, learn, and grow together.
                    </p>
                </section>
                   <button>Get started</button>

            </main>
        </div>
    );
};

export default Homepage;