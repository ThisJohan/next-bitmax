import axios from "axios";

const BASE_URL = 'https://api-test.maxpool.site'

export default axios.create({baseURL: BASE_URL})