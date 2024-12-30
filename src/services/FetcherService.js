import TurndownService from 'turndown';
import { Octokit } from 'octokit';

const FetcherService = {
    async getGithubAccessToken() {
        try {
            const githubPassURL = "https://108armycadetunit.site/auth/githubAuth/"
            const githubAccessToken = await fetch(githubPassURL, {
                method: "GET",
            });
    
            if (!githubAccessToken.ok) throw new Error(`Error fetching github access token. ${githubAccessToken.status} ${githubAccessToken.statusText}`);
            return await githubAccessToken.text();
        } catch (exception) {
            console.error(exception.message);
            return null;
        }
    },
    async fetchContent(filepath) {
        try {
            if (!filepath) return "File name is required";

            console.log(filepath);

            const token = await this.getGithubAccessToken()
            if (token === null) return;

            const octokit = new Octokit({
                auth: token
            });

            const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: 'tommiecc',
                repo: '108armycadetunitsite',
                path: 'src/App.vue',
                headers: {
                    accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            if (!response.ok) return `Could not find file/error occured while accessing file: ${response.status} ${response.statusText}`;
            
            return response.text();


        } catch (exception) {
            console.error(`${exception.message}`);
        }
    }
}

export default FetcherService;