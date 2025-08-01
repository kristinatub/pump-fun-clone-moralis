# 🔒 Security Guide

## ⚠️ CRITICAL: Your Private Key Has Been Exposed

**IMMEDIATE ACTION REQUIRED:**

1. **Create a new wallet** - The private key in `hardhat/.env` should be considered compromised
2. **Transfer any funds** from the old wallet to the new one immediately
3. **Regenerate API keys** - The Moralis API key should be regenerated

## 🛡️ Security Best Practices

### Private Keys
- **NEVER** commit private keys to git
- **NEVER** share private keys in code, documentation, or chat
- Use environment variables for all sensitive data
- Consider using hardware wallets for production

### Environment Files
- `.env` files are automatically ignored by git
- Use `.env.example` files with placeholder values
- Keep actual values in your local `.env` files only

### API Keys
- Regenerate any exposed API keys immediately
- Use environment variables for all API keys
- Never hardcode API keys in source code

## 📁 Protected Files

The following files are automatically ignored by git:
- `hardhat/.env`
- `frontend/.env`
- Any file with `.key`, `.pem`, `.secret` extensions
- `wallet.json`, `wallet.txt`, `wallet.dat`
- `secrets.json`, `credentials.json`

## 🔧 How to Set Up Environment Variables

1. Copy the example file: `cp hardhat/env.example hardhat/.env`
2. Edit `hardhat/.env` with your actual values
3. Never commit the `.env` file

## 🚨 Emergency Checklist

If you accidentally expose sensitive data:
1. ✅ **IMMEDIATE**: Transfer funds to new wallet
2. ✅ **IMMEDIATE**: Regenerate all API keys
3. ✅ **IMMEDIATE**: Remove sensitive data from git history
4. ✅ **IMMEDIATE**: Update all documentation
5. ✅ **REVIEW**: Check for any other exposed secrets

## 📞 Getting Help

If you need help with security issues:
- Check your wallet balance immediately
- Contact support for the services whose API keys were exposed
- Consider using a password manager for better security 