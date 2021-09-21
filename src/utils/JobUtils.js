module.exports = {
        remainingDays(job) {
            /*
             * Ajustes de calculo de tempo no job index
             * toFixed() responcreatel por arrendondar o valor, ex: 12,49 = 12
            */
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            const createdDate = new Date(job.created_at)
            //getDays = dias da semana getDate = dias do mês
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)

            const timeDiffInMs = dueDateInMs - Date.now()
            //Converte milissegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            //Math.floor arredonda  efetua o arredondamento para baixo diferente do toFixed()
            const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
            // Retorno de dias restantes
            return dayDiff
        },
        // Serviço de calcula do valor do projeto com valor da sua hora no perfil
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"] 
    }