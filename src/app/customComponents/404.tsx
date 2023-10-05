import '../globals.css'
const Error404Page = () => {
    return (
        <div className='bg-black text-white flex justify-content h-screen'>
            <div>
                <h1 className='display: inline-block; margin: 0px 20px 0px 0px; padding: 0px 23px 0px 0px; text-4xl font-bold vertical-align: top; line-height: 49px;'>
                    404
                </h1>
                <div className='display: inline-block;'>
                    <h2 className='text-2xl font-light'>
                        This page could not be found.
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Error404Page
