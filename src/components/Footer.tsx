import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Footer() {

  const { userResponse: {token} } = useContext(UserContext)

  let footerComponent

  const data = new Date().getFullYear()

  if(token !== '') {
    footerComponent = (
      <>
        <section>
          <div>
            <p>Savi Our Food  Generation | Copyright: {data}</p>
            <p>Acesse nossa organização no GitHub: </p>
            <div>
              <a href="https://github.com/Project-SaviOurFood" target='_blank'>
              <img src="src/assets/github.png" alt="GitHub logo" width={50} height={50}/>
              </a>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {footerComponent}
    </>
  )
}

export default Footer