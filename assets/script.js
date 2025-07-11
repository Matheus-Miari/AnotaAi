
        // Global variables
        let quill;
        let editingNoteId = null;

        // Standard nursing notes templates
        const standardNotes = [
            {
                id: 3,
                title: "Admissão de Pronto Atendimento",
                preview: "Cliente admitido em Box de Medicação. Apresenta-se calmo, consciente, orientado e acompanhado. Sem queixas ou alergias relatadas...",
                content: `<h3>ADMISSÃO DE PRONTO ATENDIMENTO</h3>
                <p><strong>Cliente admitido em Box de Medicação:</strong> ( )</p>

                <h4>Apresenta-se:</h4>
                <ul>
                    <li>Calmo: (X) Sim () Não</li>
                    <li>Consciente: (X) Sim () Não</li>
                    <li>Orientado: (X) Sim () Não</li>
                    <li>Acompanhado: (X) Sim () Não</li>
                    <li>Queixas: (X) Não () Sim, quais?</li>
                </ul>

                <h4>Pulseiras de Identificação:</h4>
                <ul>
                    <li>Identificação: (X) Sim () Não</li>
                    <li>Risco de Queda: (X) Sim () Não</li>
                    <li>Restrição de Membro: () Sim (X) Não</li>
                </ul>

                <h4>Alergia Medicamentosa:</h4>
                <ul>
                    <li>Alergia: () Sim (X) Não</li>
                    <li>→ Se “Sim”, qual?</li>
                </ul>

                <h4>Metas de Segurança:</h4>
                <ul>
                    <li>Meta 01: Identificação correta do cliente</li>
                    <li>Meta 05: Higienização das mãos</li>
                </ul>

                <h4>Dor:</h4>
                <ul>
                    <li>Cliente refere dor: () Sim (X) Não</li>
                    <li>Score de Dor:</li>
                </ul>

                <h4>Punção Venosa:</h4>
                <ul>
                    <li>Jelco: () 20G () 22G</li>
                    <li>Scalp: () 21 () 23</li>
                    <li>Conector Microclave: (X) Sim () Não</li>
                    <li>Película: () IV Fix () Tegaderm () Opsite</li>
                </ul>

                <h4>Exames Laboratoriais:</h4>
                <ul>
                    <li>Coletado: (X) Sim () Não</li>
                    <li>Enviado via tubo: (X) Sim () Não</li>
                </ul>

                <h4>Medicação:</h4>
                <ul>
                    <li>Cliente orientado sobre ação e efeitos colaterais: (X) Sim () Não</li>
                    <li>Medicação administrada conforme processo PHARM.</li>
                    <li>Recusa: (X) Não () Sim — Qual e motivo:</li>
                </ul>

                <h4>Pendências:</h4>
                <ul>
                    <li>() Radiografia</li>
                    <li>() Tomografia</li>
                    <li>() USG</li>
                    <li>() Doppler</li>
                    <li>(X) Sem pendências</li>
                </ul>

                <h4>Transporte:</h4>
                <ul>
                    <li>Acionado: (X) Sim () Não</li>
                    <li>Horário:</li>
                </ul>

                <h4>Observações Gerais:</h4>
                <p>Orientado e demonstrado uso da campainha e do sistema Quality. Reforçada a importância de acionar a equipe sempre que necessário.</p>`
            },

            {
                id: 1,
                title: "Punção de acesso venoso",
                preview: "Paciente em decúbito dorsal, membro superior (  ). Realizada antissepsia com swab. Puncionado acesso venoso periférico..........",
                content: `<h3>Punção de Acesso Venoso Periférico: </h3>
                <h4>Procedimento Realizado:</h4>
                <p>Paciente em decúbito dorsal, membro superior ( ) em extensão. Realizada antissepsia da região com swab. Puncionado acesso venoso periférico com cateter sobre agulha nº ( )G em (  ).</p>
                
                <h4>Observações:</h4>
                <ul>
                    <li>Procedimento realizado sem intercorrências</li>
                    <li>Refluxo sanguíneo presente</li>
                    <li>Fixação adequada</li>
                    <li>Paciente orientado sobre cuidados</li>
                </ul>`
            },
            {
                id: 7,
                title: "Administração de Medicamentos",
                preview: "Medicamento administrado conforme prescrição médica, sem intercorrências. Paciente orientado.comodado em box (), relizado meta 01...",
                content: `<h3>Administração de Medicamentos</h3>
                <p>Acomodado em box (), relizado meta 01, realizado punção venosa com jelco (), medicamento administrado conforme prescrição médica. Paciente orientado quanto à ação e possíveis efeitos colaterais. Sem queixas no momento, sem intercorrências durante o procedimento.</p>

                <p>Desmonstrado uso de campainha.</p>`
            },
            {
                id: 5,
                title: "Admissão de Cliente Internado",
                preview: "Cliente admitido em box de internação, consciente, orientado, em uso de oxigênio sob controle. Sem queixas de dor e sem alergias relatadas...",
                content: `<h3>Admissão de Cliente Internado</h3>
                <p>Cliente admitido em box de internação às [HORA], acompanhado, consciente, orientado e calmo. Refere-se bem, sem queixas álgicas no momento da admissão. Em ar ambiente, eupneico. Sem relatos de alergia medicamentosa até o momento.</p>

                <p>Instalado acesso venoso periférico em membro superior com Jelco [CALIBRE], fixado com película [TIPO DE PELÍCULA] e conector Microclave, conforme técnica asséptica e protocolo institucional. Cliente com prescrição dietética de [TIPO DE DIETA], aceita bem até o momento, sem intercorrências. Eliminações fisiológicas mantidas, sem alterações observadas.</p>

                <p>Paciente identificado com pulseiras de identificação conforme protocolo institucional. Aplicadas as Metas de Segurança do Paciente — Meta 01 (Identificação Correta do Paciente) e Meta 05 (Higienização das Mãos). Realizada orientação quanto ao risco de quedas e broncoaspiração, reforçando a importância de solicitar auxílio da equipe para locomoção ou alimentação. Foi também demonstrado o uso da campainha de chamada, com reforço sobre a importância de acionar a equipe sempre que necessário.</p>


                <p>Score de dor relatado no momento da admissão: [Score de dor = 0].</p>

                <p>Cliente permanece em vigilância contínua e sob cuidados da equipe multiprofissional.</p>`
            },
            {
                id: 6,
                title: "Higiene e conforto",
                preview: "Realizada higiene corporal completa. Paciente colaborativo durante o procedimento. Trocados lençóis e camisola...",
                content: `<h3>Cuidados de Higiene e Conforto</h3>
                <p><strong>Data/Hora:</strong> [DATA] - [HORA]</p>
                <p><strong>Paciente:</strong> [NOME DO PACIENTE]</p>
                
                <h4>Procedimentos Realizados:</h4>
                <ul>
                    <li>✓ Higiene corporal completa</li>
                    <li>✓ Higiene oral</li>
                    <li>✓ Troca de roupas de cama</li>
                    <li>✓ Troca de camisola/pijama</li>
                    <li>✓ Posicionamento adequado no leito</li>
                    <li>✓ Hidratação da pele</li>
                </ul>
                
                <h4>Observações:</h4>
                <p>Paciente colaborativo durante os procedimentos. Demonstrou conforto após os cuidados.`
            },
            {
                id: 8,
                title: "Protocolo de Sepse",
                preview: "Protocolo de sepse iniciado. Hemoculturas coletadas e antibiótico administrado conforme prescrição...",
                content: `<h3>Protocolo de Sepse</h3>
                <p>Protocolo de sepse iniciado às [HORA]. Sinais vitais alterados e critérios clínicos compatíveis com suspeita de sepse. Hemoculturas coletadas às [HORA DAS HEMOCULTURAS], conforme protocolo institucional, antes da administração do antibiótico.</p>

                <p>Antibiótico de amplo espectro administrado conforme prescrição médica às [HORA DO ANTIBIÓTICO], sem intercorrências. Paciente mantido em monitorização contínua, com acompanhamento da equipe multiprofissional.</p>`
            },
            {
                id: 9,
                title: "Atendimento de Dor Torácica",
                preview: "Paciente com queixa de dor torácica. ECG realizado e protocolo seguido conforme fluxograma institucional...",
                content: `<h3>Atendimento de Dor Torácica</h3>
                <p>Paciente admitido com queixa de dor torácica em região [LOCALIZAÇÃO], início há [TEMPO], intensidade referida [ESCALA DE DOR]. Sinais vitais aferidos e monitoramento cardíaco iniciado.</p>

                <p>ECG realizado às [HORA DO ECG], encaminhado para avaliação médica imediata as [ ]</p>

                <p>Paciente permanece sob vigilância, com suporte clínico conforme evolução médica.</p>`
            },
        {
            id: 10,
            title: "Evolução de Enfermagem - Admissão",
            preview: "Paciente admitido consciente, orientado, sinais vitais dentro dos parâmetros. Sem queixas no momento...",
            content: `<h3>Evolução de Enfermagem - Admissão</h3>
            <p>Paciente admitido em leito de enfermaria às [HORA], acompanhado de familiar. Apresenta-se consciente, orientado em tempo e espaço, eupneico, afebril, sem queixas álgicas no momento.</p>
            <p>Realizada verificação de sinais vitais: PA: [ ], FC: [ ], FR: [ ], Temp: [ ]. Saturando [ ]% em ar ambiente.</p>
            <p>Instalado acesso venoso periférico com jelco nº [ ], em [local], fixado com película estéril. Coletadas amostras laboratoriais conforme prescrição. Pulseira de identificação posicionada.</p>
            <p>Paciente orientado quanto ao funcionamento da unidade e uso da campainha de chamada. Mantido sob cuidados de enfermagem.</p>`
        },
        {
            id: 11,
            title: "Evolução de Enfermagem - Pós-procedimento",
            preview: "Paciente retorna do procedimento em bom estado geral, sinais vitais estáveis, sem queixas de dor...",
            content: `<h3>Evolução de Enfermagem - Pós-procedimento</h3>
            <p>Paciente retorna do centro cirúrgico às [HORA], em recuperação anestésica, monitorado. Apresenta-se consciente, orientado, sinais vitais dentro dos parâmetros de normalidade.</p>
            <p>Curativo cirúrgico em [região], sem sinais de sangramento ativo. Acesso venoso pérvio, infusão de SF 0,9% em gotejamento contínuo.</p>
            <p>Paciente sem queixas de dor no momento, score de dor = [ ]. Referida náusea leve, sem vômitos. Higiene e conforto realizados. Orientado sobre sinais de alerta. Mantido sob vigilância da equipe de enfermagem.</p>`
        },
        {
            id: 12,
            title: "Evolução de Enfermagem - Alteração de padrão respiratório",
            preview: "Paciente apresenta dispneia leve, uso de musculatura acessória, saturação em queda. Equipe médica acionada...",
            content: `<h3>Evolução de Enfermagem - Alteração Respiratória</h3>
            <p>Paciente evolui com dispneia aos mínimos esforços, uso de musculatura acessória, FR aumentada ([ ] irpm), saturação de O₂ em [ ]% em ar ambiente.</p>
            <p>Iniciado O₂ sob cateter nasal 2L/min. Sinais vitais monitorados, posicionamento em semifowler. Equipe médica acionada e orientações seguidas conforme conduta médica.</p>
            <p>Paciente permanece em observação, reavaliado a cada 30 minutos. Registrado no prontuário e comunicado à enfermagem do plantão seguinte.</p>`
        },
        {
            id: 13,
            title: "Evolução de Enfermagem - Estabilidade clínica",
            preview: "Paciente encontra-se estável, aceitando dieta, eliminações presentes e espontâneas...",
            content: `<h3>Evolução de Enfermagem - Estabilidade Clínica</h3>
            <p>Paciente encontra-se consciente, orientado, afebril, com sinais vitais dentro dos parâmetros habituais. Refere aceitação da dieta oferecida, eliminações fisiológicas mantidas e espontâneas.</p>
            <p>Sem queixas de dor ou desconforto no momento. Acesso venoso pérvio, medicações administradas conforme prescrição médica. Curativos avaliados, sem intercorrências. Orientado e colaborativo com a equipe de enfermagem.</p>
            <p>Paciente em condições estáveis, seguindo em cuidados de rotina da unidade.</p>`
        },
        {
            id: 14,
            title: "Evolução de Enfermagem - Alta hospitalar",
            preview: "Paciente recebe alta médica, orientado quanto à medicação, curativos e sinais de alerta...",
            content: `<h3>Evolução de Enfermagem - Alta Hospitalar</h3>
            <p>Paciente com alta médica liberada às [HORA]. Apresenta-se em bom estado geral, consciente, orientado, sem queixas de dor. Realizada conferência dos pertences e retirada de acesso venoso periférico.</p>
            <p>Paciente e acompanhante orientados verbalmente e por escrito quanto à prescrição de medicações, cuidados com o curativo, sinais de alerta e retorno ambulatorial. Entregue receita médica, guia de retorno e orientações.</p>
            <p>Paciente deixou a unidade de cadeira de rodas, acompanhado por familiar. Alta registrada e prontuário encerrado pela equipe de enfermagem.</p>`
        }


        ];

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializeQuill();
            loadStandardNotes();
            loadPersonalNotes();
            setupEventListeners();
        });

        // Initialize Quill editor
        function initializeQuill() {
            quill = new Quill('#editor', {
                theme: 'snow',
                placeholder: 'Digite o conteúdo da sua anotação...',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['link', 'blockquote'],
                        ['clean']
                    ]
                }
            });
        }

        // Setup event listeners
        function setupEventListeners() {
            document.getElementById('noteForm').addEventListener('submit', saveNote);
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                const modal = document.getElementById('noteModal');
                if (event.target === modal) {
                    closeModal();
                }
            });
        }

        // Load standard nursing notes
        function loadStandardNotes() {
            const container = document.getElementById('standardNotes');
            container.innerHTML = '';

            standardNotes.forEach(note => {
                const card = createStandardNoteCard(note);
                container.appendChild(card);
            });
        }

        // Create standard note card
        function createStandardNoteCard(note) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-title">${note.title}</div>
                <div class="card-preview">${note.preview}</div>
                <div class="card-actions">
                    <button class="btn btn-primary btn-small" onclick="viewNote(${note.id}, 'standard')">
                        Ver Completa
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="copyNote('${note.title}', \`${note.content.replace(/`/g, '\\`')}\`)">
                        Copiar
                    </button>
                </div>
            `;
            return card;
        }

        // Load personal notes from localStorage
        function loadPersonalNotes() {
            const container = document.getElementById('personalNotes');
            const notes = getPersonalNotes();
            
            container.innerHTML = '';

            if (notes.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        
                        <h3>Nenhuma anotação pessoal encontrada</h3>
                        <p>Comece criando sua primeira anotação usando o formulário acima.</p>
                        <div style="font-size: 48px; color: #bbb; margin: 20px 0;">😢</div>
                    </div>
                `;
                return;
            }

            notes.forEach(note => {
                const card = createPersonalNoteCard(note);
                container.appendChild(card);
            });
        }

        // Create personal note card
        function createPersonalNoteCard(note) {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Create preview from HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.content;
            const preview = tempDiv.textContent.substring(0, 150) + '...';

            card.innerHTML = `
                <div class="card-title">${note.title}</div>
                <div class="card-preview">${preview}</div>
                <div style="font-size: 14px; color: var(--text-light); margin-bottom: 15px;">
                    Criado em: ${new Date(note.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary btn-small" onclick="viewNote('${note.id}', 'personal')">
                        Ver Completa
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="editNote('${note.id}')">
                        Editar
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="copyNote('${note.title}', \`${note.content.replace(/`/g, '\\`')}\`)">
                        Copiar
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteNote('${note.id}')">
                        Excluir
                    </button>
                </div>
            `;
            return card;
        }

        // Get personal notes from localStorage
        function getPersonalNotes() {
            const notes = localStorage.getItem('anotaai_personal_notes');
            return notes ? JSON.parse(notes) : [];
        }

        // Save personal notes to localStorage
        function savePersonalNotes(notes) {
            localStorage.setItem('anotaai_personal_notes', JSON.stringify(notes));
        }

        // Save note function
        function saveNote(event) {
            event.preventDefault();
            
            const title = document.getElementById('noteTitle').value.trim();
            const content = quill.root.innerHTML;
            
            if (!title) {
                showToast('Por favor, digite um título para a anotação.', 'error');
                return;
            }
            
            if (quill.getText().trim().length === 0) {
                showToast('Por favor, digite o conteúdo da anotação.', 'error');
                return;
            }

            const notes = getPersonalNotes();
            
            if (editingNoteId) {
                // Update existing note
                const noteIndex = notes.findIndex(note => note.id === editingNoteId);
                if (noteIndex !== -1) {
                    notes[noteIndex] = {
                        ...notes[noteIndex],
                        title,
                        content,
                        updatedAt: new Date().toISOString()
                    };
                    showToast('Anotação atualizada com sucesso!', 'success');
                }
                editingNoteId = null;
            } else {
                // Create new note
                const newNote = {
                    id: Date.now().toString(),
                    title,
                    content,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                notes.push(newNote);
                showToast('Anotação salva com sucesso!', 'success');
                // Show happy face when note is saved
                showToast('😃', 'success');
            }
            
            savePersonalNotes(notes);
            loadPersonalNotes();
            
            // Reset form
            document.getElementById('noteForm').reset();
            quill.setContents([]);
        }

        // View note in modal
        function viewNote(noteId, type) {
            let note;
            
            if (type === 'standard') {
                note = standardNotes.find(n => n.id === noteId);
            } else {
                const notes = getPersonalNotes();
                note = notes.find(n => n.id === noteId);
            }
            
            if (note) {
                document.getElementById('modalTitle').textContent = note.title;
                document.getElementById('modalContent').innerHTML = note.content;
                document.getElementById('noteModal').style.display = 'block';
            }
        }

        // Edit note
        function editNote(noteId) {
            const notes = getPersonalNotes();
            const note = notes.find(n => n.id === noteId);
            
            if (note) {
                document.getElementById('noteTitle').value = note.title;
                quill.root.innerHTML = note.content;
                editingNoteId = noteId;
                
                // Scroll to form
                document.querySelector('.section:nth-child(2)').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                
                showToast('Anotação carregada para edição.', 'success');
            }
        }

        // Delete note
        function deleteNote(noteId) {
            if (confirm('Tem certeza que deseja excluir esta anotação? É sua? Se não for, não apague!')) {
                const notes = getPersonalNotes();
                const filteredNotes = notes.filter(note => note.id !== noteId);
                savePersonalNotes(filteredNotes);
                loadPersonalNotes();
                showToast('Anotação excluída com sucesso!', 'success');
            }
        }

        // Copy note content
        function copyNote(title, content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;

            // Converte o HTML em texto com quebras de linha
            const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
            let result = '';

            while (walker.nextNode()) {
                const node = walker.currentNode;

                if (node.nodeType === Node.TEXT_NODE) {
                    result += node.nodeValue;
                } else if (node.nodeName === 'P' || node.nodeName === 'H3' || node.nodeName === 'H4') {
                    result += '\n';
                } else if (node.nodeName === 'LI') {
                    result += '\n• ';
                } else if (node.nodeName === 'BR') {
                    result += '\n';
                }
            }
        
        const formatted = `${title}\n\n${result.trim()}`;   

            navigator.clipboard.writeText(formatted).then(() => {
                showToast('Anotação copiada para a área de transferência!', 'success');
            }).catch(err => {
                // fallback
                const textArea = document.createElement('textarea');
                textArea.value = formatted;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Anotação copiada para a área de transferência (fallback)!', 'success');
            });
        }
        // Close modal
        function closeModal() {
            document.getElementById('noteModal').style.display = 'none';
        }

        // Show toast notification
        function showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        // Toggle dark mode (placeholder)
        function toggleDarkMode() {
            showToast('Modo escuro ativado', 'info');
        }

        // Logout function
        function logout() {
            if (confirm('Tem certeza que deseja trocar de conta? Suas anotações locais serão mantidas.')) {
                showToast('Redirecionando para login...', 'info');
                // Here you would redirect to login page
                setTimeout(() => {
                    window.location.href = '#login';
                }, 1500);
            }
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Ctrl/Cmd + S to save
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                document.getElementById('noteForm').dispatchEvent(new Event('submit'));
            }
            
            // Escape to close modal
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        
        
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    const toggleBtn = document.getElementById('toggleDarkBtn'); // <- ID do botão
    const icon = toggleBtn.querySelector('i');

    // Atualiza o ícone
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Atualiza o texto
    toggleBtn.querySelector('span').textContent = isDark ? 'Modo Claro' : 'Modo Escuro';

    showToast(isDark ? 'Modo escuro ativado!' : 'Modo claro ativado!', 'success');
}
