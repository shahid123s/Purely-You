import axios from "axios";
import qs from "qs";


export const aiAnalyserController = async (req, res, next) => {
    try {
        // Validate input exists
        const {input} = req.body;
        if (!input) {
            return res.status(400).json({
                success: false,
                message: 'Input is required'
            });
        }

        console.log('input received:', input);
        
        let result = await axios.post('http://127.0.0.1:5000/analyze', { 
            text: input  // Send JSON instead of URL-encoded
        }, {
            headers: {
                'Content-Type': 'application/json'  // Change content type to JSON
            }
        });
        // Send response back to client
        return res.status(200).json({
            success: true,
            data: result.data
        });

    } catch (error) {
        // Proper error handling
        console.error('Error in aiAnalyser:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing request',
            error: error.message
        });
    }
}