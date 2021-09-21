const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async index(req, res) {
        //Pegando o Utils para calcular os dias e carregando a dashboard
        const jobs = await Job.get();
        const profile = await Profile.get();

        //Calculo do dashboard
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        // Total de horas de cada serviço 
        let jobTotalHours = 0
        
        const updateJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            //if ternario efetuado em uma unica linha (verificando o status do serviço)
            const status = remaining <= 0 ? 'done' : 'progress'
            //Somando a quantidade de status da dashboard
            statusCount[status] += 1;

            // Somando o tempo livre na dashboardController (opção ternário)
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;
            
            // Os "..." pega tudo dentro do obj e monta a estrutura com as informações 
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hours"])
            }
        })

        // qtd de horas que desejo trabalhar menos a qtd horas/dia de cada serviço em progresso
        const freeHours = profile["hours-per-day"] - jobTotalHours;
    
        return res.render("index", { job: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
            
    }

}

