import axios from 'axios'

export const aiAnalyserController = async (req, res, next) => {
    try {
        const {input} = req.body;
        console.log('varuuna')
        const result = await axios.post('http://127.0.0.1:6000/analyze', input)

        console.log(result, 'result')


    } catch (error) {
        next(error)
    }
}