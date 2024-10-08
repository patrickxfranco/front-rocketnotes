import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { Container, Form, Avatar } from "./styles";

export function Profile() {
	const { user, updateProfile } = useAuth();

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [passwordOld, setPasswordOld] = useState("");
	const [passwordNew, setPasswordNew] = useState("");

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
	const [avatar, setAvatar] = useState(avatarUrl);
	const [avatarFile, setAvatarFile] = useState(null);

	const navigate = useNavigate();
	
	function handleBack() {
		navigate(-1);
	}

	async function handleUpdate() {
		const updated = {
			name,
			email,
			password: passwordNew,
			old_Password: passwordOld,
		};

		const userUpdated = Object.assign(user, updated);

		await updateProfile({ userUpdated, avatarFile });
	}

  async function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

	return (
		<Container>
			<header>
				<button type="button" onClick={handleBack}>
					<FiArrowLeft />
				</button>
			</header>
			<Form>
				<Avatar>
					<img src={avatar} alt="Foto do usuário" />
					<label htmlFor="avatar">
						<FiCamera />
						<input id="avatar" type="file" onChange={handleChangeAvatar} />
					</label>
				</Avatar>

				<Input
					placeholder="Nome"
					type="text"
					icon={FiUser}
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<Input
					placeholder="Email"
					type="email"
					icon={FiMail}
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<Input
					placeholder="Senha atual"
					type="password"
					icon={FiLock}
					onChange={(event) => setPasswordOld(event.target.value)}
				/>
				<Input
					placeholder="Nova senha"
					type="password"
					icon={FiLock}
					onChange={(event) => setPasswordNew(event.target.value)}
				/>
				<Button title="Salvar" onClick={handleUpdate} />
			</Form>
		</Container>
	);
}
