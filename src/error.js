
class GulgError extends Error {

  constructor (props) {
    super(props)
    console.log()
    console.log('Oops! Something went wrong.  😞   Error below.  ⬇️ ')
    console.log(props)
    console.log()
  }

}

export default GulgError
