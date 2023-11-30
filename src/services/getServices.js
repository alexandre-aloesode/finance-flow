export default function FinanceServices() {

  async function handle(link, data) { 

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    const fetchParams = {
      method: "POST",
      body: formData,
    };
    const req = await fetch(`http://localhost:80/finance-flow/back/${link}.php`, fetchParams);
    const response = await req.json();
    return response;
  }
  return { handle };
}
