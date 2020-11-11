import Header from '../header'

function Standard({ children }) {
    return (
        <div className="h-screen bg-gray-300">
            <Header />
            {children}
        </div>
    )
}

export default Standard;