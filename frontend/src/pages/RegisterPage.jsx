const resp = await apiPost("/auth/register", {
  name: nome, email, password: senha
});
if (resp?.ok && resp.token) {
  saveSession(resp);
  window.location.href = "/dashboard";
} else {
  alert(resp?.msg || "Erro ao cadastrar");
}
