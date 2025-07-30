import styles from './aboutUsPage.module.css';

function AboutUsPage() {
    return (
        <div className={`${styles.aboutUsPage} tuck-under-navbar`}>
            <div className="vertical-center horizontal-center text-center">
                <h1>About Us</h1>
                <p>For Students Anywhere</p>
            </div>
            <div className={styles.aboutUsPageContent}>
                <div className="">
                    <h1>Who We Are</h1>
                    <p>We're a small team of graduate students passionate about making financial literacy accessible to everyone—especially students. We understand firsthand how confusing taxes and budgeting can be when you're just starting out.</p>
                </div>
                <div className="">
                    <h1>Why We Built This App</h1>
                    <p>
                        We noticed that many students don't fully understand how taxes work or how to save money effectively. Traditional tools often feel complicated or don't adapt to individual needs. That's why we created this app—to simplify these concepts and empower you to take control of your finances.
                    </p>
                </div>
                <div className="">
                    <h1>What Makes Us Different</h1>
                    <p>Our app uses machine learning to analyze your financial situation and recommend the best budgeting methods tailored just for you. No one-size-fits-all approach here — you get personalized guidance that grows with you.</p>
                </div>
                <div className="">
                    <h1>Our Mission</h1>
                    <p>We want every student who uses our app to walk away feeling confident in managing their taxes and budgeting their money. Financial knowledge is a powerful tool, and we're here to help you unlock it.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUsPage;