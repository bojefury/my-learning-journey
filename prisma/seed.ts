console.log('Help Store seed: create development-only categories, neutral products and USER/MANAGER/ADMIN accounts here.');
if(process.env.NODE_ENV==='production') throw new Error('Seed is disabled in production');
