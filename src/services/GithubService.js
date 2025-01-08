import { useSecureApi } from "@/utils/useSecureApi";

const { makeRequest, error, loading } = useSecureApi("/auth");
let TOKEN = '';
const OWNER = "tommiecc";
const REPO = "108armycadetunitsite";
const BRANCH = "master";
let uploadId = 0;

const GithubService = {
    async getToken() {
        const res = await makeRequest("/github", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        TOKEN = await res.text();
    },
    async uploadFile(file) {
        this.getToken();
        const uploadFile = {
            id: `upload-${uploadId++}`,
            name: file.name,
            progress: 0
        };

        try {
            const base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result.split(',')[1]);
                reader.readAsDataURL(file);
            });

            const path = `src/assets/img/${file.name}`;
            const message = `Upload ${file.name} (generated by Github API Service)`;

            let sha;
            try {
                const res = await fetch(
                    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${TOKEN}`,
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );

                if (res.ok) {
                    const data = await res.json();
                    sha = data.sha;
                }
            } catch (error) {
                console.log("File does not exist... defaulting to upload");
            }

            const res = await fetch(
                `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
                {
                    method: "PUT",
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify({
                        message,
                        content: base64Data,
                        branch: BRANCH,
                        ...(sha && { sha }),
                    })
                }
            );

            if (!res.ok) {
                throw new Error(`Github API error: ${res.statusText}`);
            }

            uploadFile.progress = 100;
        } catch (error) {
            console.error('Error uploading to Github: ', error);
            uploadFile.progress = 0;
        }
    }
}

export default GithubService;